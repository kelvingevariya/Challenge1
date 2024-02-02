import { Request, Response } from "express";
import quizJSON from "./JSONData/quiz.json";
import responseJSON from "./JSONData/response.json";
import formatJSON from "./JSONData/format.json";
import topicJSON from "./JSONData/topic.json";
import { json } from "stream/consumers";


const express = require("express");
const path = require("path");
const router = express.Router();


const fs = require("fs");

const app = express();





const PORT: number = 3000;


app.use(express.json());


//!api for quiz 

app.post("/quiz/:pm", (req: Request, res: Response) => {
    const colmn = req.params.pm;
    const idGet = req.body.ids;
    let totalPoints = 0;

    switch (colmn) {
        //! topic column
        case "topic": {
            for (let i = 0; i < idGet.length; i++) {
                quizJSON.forEach(element => {
                    if (element.topic_id === idGet[i]) {
                        let points = 100
                        totalPoints += points
                    }
                })
            }
            responseJSON.forEach((secName) => {
                if (secName.section_type === "Quiz") {

                    secName.points = totalPoints;
                }
            })
            console.log();

            break;
        }
        case "format": {
            for (let i = 0; i < idGet.length; i++) {
                formatJSON.forEach(element => {
                    if (element.id === idGet[i]) {
                        if (element.title === "Playing" || "Self-practicing") {
                            let points = 10
                            totalPoints += points
                        }
                    }
                })
            }

            responseJSON.forEach((secName) => {
                if (secName.section_type === "Quiz") {

                    secName.points = totalPoints;
                }
            })
            /*  fs.writeFile("./JSONData/resonse.json", responseJSON, () => {
                  console.log("File Updated");
              })*/
            res.end(JSON.stringify(responseJSON.find((key) => key.section_type === "Quiz")))
            break;
        }
        case "source": {
            res.send("No condition for Source")
            break;
        }
        default:
            break;
    }
})


//!API FOR NEWS

app.post("/news/:pm", (req: Request, res: Response) => {
    const colmn = req.params.pm;
    const idGet = req.body.ids;
    let totalPoints = 0;

    switch (colmn) {

        //! topic column
        case "topic": {

            for (let i = 0; i < idGet.length; i++) {
                responseJSON.find((key) => key.section_type === "news")?.content.forEach(element => {
                    if (element.topic_id === idGet[i]) {

                        totalPoints += 100;
                    }
                })
            }

            responseJSON.forEach((secName) => {
                if (secName.section_type === "Quiz") {
                    secName.points = totalPoints;
                }
            })
            console.log(responseJSON.find((key) => key.section_type === "news"));
            res.end()
            break;
        }
        case "format": {

            for (let i = 0; i < idGet.length; i++) {
                formatJSON.forEach(element => {
                    if (element.id === idGet[i]) {
                        if (element.title === "Playing") {
                            let points = 100
                            totalPoints += points;
                        }
                    }
                })
            }

            responseJSON.forEach((secName) => {
                if (secName.section_type === "Quiz") {
                    secName.points = totalPoints;
                }
            })
            /*  fs.writeFile("./JSONData/resonse.json", responseJSON, () => {
                  console.log("File Updated");
              })*/
            console.log(responseJSON.find((key) => key.section_type === "news"));
            res.end()
            break;
        }

        case "source": {
            res.send("No condition for Source")
            break;
        }
        default:
            break;
    }
})


//! API For GAMES

app.post("/games/:pm", (req: Request, res: Response) => {
    const colmn = req.params.pm;
    const idGet = req.body.ids;
    let totalPoints = 0;

    switch (colmn) {
        //! topic column
        case "topic": {

            break;
        }
        case "format": {

            for (let i = 0; i < idGet.length; i++) {
                formatJSON.forEach(element => {
                    if (element.id === idGet[i]) {
                        if (element.title === "Playing") {
                            let points = 10

                            totalPoints += points;
                        }
                    }
                })
            }
            /*  fs.writeFile("./JSONData/resonse.json", responseJSON, () => {
                  console.log("File Updated");
              })*/

            responseJSON.find((secName) => {
                if (secName.section_type === "games") {
                    let totalPoints = 0;
                    secName.points = totalPoints;
                }
            })

            console.log(responseJSON.find((key) => key.section_type === "games"));
            res.end()
            break;
        }

        case "source": {
            res.send("No condition for Source")
            break;
        }
        default:
            break;
    }
})


//! API FOR Custom Section 
app.post("")







app.listen(PORT, console.log("Server Stared on :" + `http://localhost:${PORT}`)
)

