import { Request, Response, response } from "express";
import quizJSON from "./JSONData/quiz.json";
import responseJSON from "./JSONData/response.json";
import formatJSON from "./JSONData/format.json";
import topicJSON from "./JSONData/topic.json";
import sectionJSON from "./JSONData/section.json"
import customItemsJSON from "./JSONData/custom-items.json"
import { json } from "stream/consumers";

const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const app = express();

const PORT: number = 4000;

app.use(express.json());

app.post("/scores", (req: Request, res: Response) => {
    const topic: [] = req.body.topic;
    const format: [] = req.body.format;
    const source: [] = req.body.source;

    //* Function  for the static fields


    function calculatePoints() {
        responseJSON.forEach((sec) => {
            //@ts-ignore
            sec.points = 0;
        });

        for (let i = 0; i < topic.length; i++) {
            quizJSON.forEach((topicQuiz) => {
                if (topicQuiz.topic_id === topic[i]) {
                    responseJSON.forEach((secName) => {
                        if (secName.section_type === "Quiz") {
                            //@ts-ignore
                            secName.points += 100;
                        }
                    });
                }
            });

            responseJSON.forEach((key) => {
                if (key.section_type === "news" && key.content.some(element => element.topic_id === topic[i])) {
                    //@ts-ignore
                    key.points += 100;
                }
            });

            formatJSON.forEach((element) => {
                if (element.id === format[i]) {
                    let elementType = element.title;
                    if (elementType === "Playing" || elementType === "Self-practicing") {
                        responseJSON.forEach((secName) => {
                            if (secName.section_type === "quiz") {
                                //@ts-ignore
                                secName.points += 10;
                            }
                        });
                    }
                    if (elementType === "Reading") {
                        responseJSON.forEach((secName) => {
                            if (secName.section_type === "news") {
                                //@ts-ignore
                                secName.points += 10;
                            }
                        });
                    }
                    if (elementType === "Playing") {
                        responseJSON.forEach((secName) => {
                            if (secName.section_type === "games") {
                                //@ts-ignore
                                secName.points += 10;
                            }
                        });
                    }
                }
            });

            sectionJSON.forEach((ids) => {
                if (topic[i] === ids.topic_id) {
                    let secId = ids.id;
                    responseJSON.find((el) => {
                        if (el.section_id === secId) {
                            //@ts-ignore
                            el.points += 100;
                        }
                    });
                }
            });

            customItemsJSON.forEach(element => {
                while (source[i] === element.source_id) {
                    responseJSON.forEach((key) => {
                        if (element.section_id === key.section_id) {
                            //@ts-ignore
                            key.points += 10;
                        }
                    })
                }
            })

            customItemsJSON.forEach((sec) => {
                if (format[i] === sec.source_id) {
                    responseJSON.forEach((key) => {
                        if (sec.section_id === key.section_id) {
                            //@ts-ignore
                            key.points += 10;
                        }
                    });
                }
            });
        }
    }





    calculatePoints();
    //@ts-ignore
    responseJSON.sort((x, y) => y.points - x.points)
    res.json(responseJSON);
})


app.listen(PORT, () => console.log("sever started")
)