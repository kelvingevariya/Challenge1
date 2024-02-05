export interface news {
    "section_id": number,
    "section_name": string,
    "section_layout": string,
    "section_type": string,
    "content": newsContent[]
}

export interface newsContent {
    "topic_id": number,
    "title": string,
    "description": string,
    "source": { "title": string, "image": string },
    "publishedDate": string,
    "link": string,
    "image": string,
    "cartageory": string,
    "newsId": string

}
export interface gamesContent {
    "id": number,
    "title": string,
    "category": string,
    "url": string,
    "order": number,
    "script": string,
    "status": string,
    "goal": string,
    "instruction"?: null | string,
    "isMuted": boolean,
    "createdAt": string,
    "updatedAt": string
}


export interface games {
    "section_id": number,
    "section_name": string,
    "section_layout": string,
    "section_type": string,
    "content": gamesContent[]
}

export interface quizContent {
    "id": number,
    "title": string,
    "social_proof_count": number,
    "content_type": string
}

export interface quiz {
    "section_id": number,
    "section_layout": string,
    "section_type": string,
    "content": quizContent[]

}

export interface flightContent {
    "id": number,
    "title": string,
    "description": string,
    "content_type": string,
    "content_type_title": string,
    "source_id": number,
    "format_id": number,
    "section_id": number,
    "source": string,
    "format": string
}

export interface flight {
    "section_id": number,
    "section_name": string,
    "section_layout": string,
    "section_type": string,
    "content": flightContent[]
}