import { Request, Response, response } from "express";
import quizJSON from "./JSONData/quiz.json";
import responseJSON from "./JSONData/response.json";
import formatJSON from "./JSONData/format.json";
import sectionJSON from "./JSONData/section.json"


import { json } from "stream/consumers";

const express = require("express");



const app = express();

const PORT: number = 4000;

app.use(express.json());

app.get("/scores", (req: Request, res: Response) => {
    const topic: [] = req.body.topic;
    const format: [] = req.body.format;
    const source: [] = req.body.source;



    //* Adding the initial scores to all sections
    function calculatePoints() {
        responseJSON.forEach((sec) => {
            //@ts-ignore
            sec.points = 0;
        });

        //! Quiz section in topic 
        quizJSON.forEach((topicQuiz) => {
            let i = 0
            if (topicQuiz.topic_id === topic[i]) {
                responseJSON.forEach((secName) => {
                    if (secName.section_type === "Quiz") {
                        //@ts-ignore
                        secName.points += 100;
                    }
                });
                i++;

            }

        });

        for (let i = 0; i < topic.length; i++) {
            //! Quiz in topic 
            let pointsAddedQuiz = [];

            //! News in topic 

            responseJSON.forEach((key) => {
                if (key.section_type === "news" && key.content.some(element => element.topic_id === topic[i])) {
                    //@ts-ignore
                    key.points += 100;
                }
            });


            //! Format for all the rows
            formatJSON.forEach((element) => {
                if (element.id === format[i]) {
                    let elementType = element.title;

                    //! Conditions for quiz
                    if (elementType === "Playing" || elementType === "Self-practicing") {
                        responseJSON.forEach((secName) => {
                            if (secName.section_type === "Quiz") {
                                //@ts-ignore
                                secName.points += 10;
                            }
                        });
                    }
                    //! Condition for news
                    if (elementType === "Reading") {
                        responseJSON.forEach((secName) => {
                            if (secName.section_type === "news") {
                                //@ts-ignore
                                secName.points += 10;
                            }
                        });
                    }
                    //! Condition for games
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

            //! Customm Section  

            responseJSON.forEach((sec) => {
                if (sec.section_type === "Flight") {
                    let secContent = sec.content;
                    secContent.forEach((secCon) => {
                        //!  Format 
                        if (secCon.format_id === format[i]) {
                            //@ts-ignore
                            sec.points += 10;
                        }
                        // //!Source 
                        if (secCon.source_id === source[i]) {
                            //@ts-ignore
                            sec.points += 10;
                        }

                    })

                }
            })

            //! Topic 

            for (let j = 0; j < sectionJSON.length; j++) {
                responseJSON.forEach((secName) => {
                    if (secName.section_type === "Flight") {
                        sectionJSON.forEach((idFormat) => {
                            if (idFormat.id === secName.section_id) {
                                if (idFormat.topic_id === topic[j]) {
                                    //@ts-ignore
                                    secName.points += 100;
                                }
                            }
                        })
                    }
                })
            }
        }
    }

    calculatePoints();
    //@ts-ignore
    responseJSON.sort((x, y) => y.points - x.points)


    res.json(responseJSON);
})


app.listen(PORT, () => console.log("sever started")
)