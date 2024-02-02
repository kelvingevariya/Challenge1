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

const PORT: number = 3000;

app.use(express.json());

app.post("/scores", (req: Request, res: Response) => {
    const topic: [] = req.body.topic;
    const format: [] = req.body.format;
    const source: [] = req.body.source;

    //* Function  for the static fields
    function calulatePoints() {
        let totalPointsQuiz, totalPointsNews, totalPointsGames = 0;


        let flagQuiz = false;
        let falgCustomSec = false;
        for (let i = 0; i < topic.length; i++) {

            //!Calculation for the custom Section
            customItemsJSON.forEach((cs) => {
                //!Format 
                if (cs.format_id === format[i]) {
                    responseJSON.forEach((sec) => {
                        sec.section_id === cs.section_id
                        //@ts-ignore
                        sec.points += 10;
                    })
                }

                //!Source
                if (cs.source_id === source[i]) {
                    responseJSON.forEach((sec) => {
                        sec.section_id === cs.section_id
                        //@ts-ignore
                        sec.points += 10;
                    })

                }
                //!Calulation for the custom section topic

                let secId = cs.section_id;
                sectionJSON.forEach((frj) => {
                    if (frj.id === secId) {
                        if (frj.topic_id === topic[i]) {
                            falgCustomSec = true;
                        }
                    }
                })
                if (falgCustomSec == true) {
                    responseJSON.find((sec) => {
                        if (sec.section_id === secId) {
                            //@ts-ignore
                            sec.points += 10;
                        }
                    })
                }
            })
            //!Calculation for Quiz in Topic
            quizJSON.forEach(element => {
                if (element.topic_id === topic[i]) {
                    flagQuiz = true;
                }
                //!Flag for not adding the score every time
                if (flagQuiz === true) {
                    totalPointsQuiz += 100;

                }
            })
            formatJSON.forEach(element => {
                //!Condition for format
                if (element.id === format[i]) {
                    //!Condition for quiz
                    if (element.title === "Playing" || "Self-practicing") {
                        totalPointsQuiz += 10
                    }
                    //!Condition for News
                    if (element.title === "Reading") {
                        totalPointsNews += 10;
                    }
                    //!COndition for Games
                    if (element.title === "Playing") {
                        totalPointsGames += 10;
                    }
                }
            })
            //!Calulation For News and Topic
            responseJSON.find((key) => key.section_type === "news")?.content.forEach(element => {
                if (element.topic_id === topic[i]) {
                    let points = 100
                    totalPointsNews += points;
                }
            })
            flagQuiz = false;
        }
        //!Adding the score to the respective sections
        //?  Quiz
        responseJSON.forEach((secName) => {
            if (secName.section_type === "Quiz") {

                secName.points = totalPointsQuiz;
            }
        })
        //?  News
        responseJSON.forEach((secName) => {
            if (secName.section_type === "news") {
                secName.points = totalPointsNews;
            }
        })
        //?  Games
        responseJSON.find((secName) => {
            if (secName.section_type === "games") {
                secName.points = totalPointsGames;
            }
        })
    }


    calulatePoints();
    res.json(responseJSON);
})


app.listen(PORT, () => console.log("server started"))