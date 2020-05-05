export enum FileStatus {
    CREATED = 'CREATED',
    UPLOADED = 'UPLOADED',
    STORED = 'STORED',
    CANCELLED = 'CANCELLED',
}

export enum FileType {
    MANUSCRIPT_SOURCE_PENDING = 'MANUSCRIPT_SOURCE_PENDING',
    MANUSCRIPT_SOURCE = 'MANUSCRIPT_SOURCE',
    SUPPORTING_FILE = 'SUPPORTING_FILE',
}

export type File = {
    id: string;
    type: string;
    filename: string;
    url: string;
    mimeType: string;
    size: number;
    status: string;
    downloadLink: string;
};

export type Suggestion = {
    fieldName: string;
    value: string;
};

export type Submission = {
    id: string;
    title: string;
    updated: Date;
    articleType: string;
    status: string;
    createdBy: string;
    files: {
        manuscriptFile?: File;
        supportingFiles?: Array<File>;
    };
    suggestions: Array<Suggestion>;
};

export class Answer {
    readonly questionId: string;
    readonly answer: string;

    constructor(questionId: string, answer: string) {
        this.questionId = questionId;
        this.answer = answer;
    }
}

export class Question {
    readonly id: string;
    readonly question: string;

    constructor(id: string, question: string) {
        this.id = id;
        this.question = question;
    }
}

export class SurveyAnswer {
    readonly questionId: string;
    readonly text: string;
    readonly answer: string;

    public constructor(questionId: string, text: string, answer: string) {
        this.questionId = questionId;
        this.text = text;
        this.answer = answer;
    }
}

export class SurveyResponse {
    id: string;
    surveyId: string;
    submissionId: string;
    questions: Question[];
    answers: Answer[];

    constructor(
        id: string,
        surveyId: string,
        submissionId: string,
        questions: Question[] = [],
        answers: Answer[] = [],
    ) {
        this.id = id;
        this.surveyId = surveyId;
        this.submissionId = submissionId;
        this.questions = questions;
        this.answers = answers;
    }

    // store the answer to a question along with the question text, replacing it if one already exists
    answerQuestion(questionId: string, questionText: string, answerText: string): void {
        const newAnswer = new Answer(questionId, answerText);
        const newQuestion = new Question(questionId, questionText);

        const answerIndex = this.answers.findIndex(answer => answer.questionId === questionId);
        answerIndex !== -1 ? this.answers.splice(answerIndex, 1, newAnswer) : this.answers.push(newAnswer);

        const questionIndex = this.questions.findIndex(question => question.id === questionId);
        questionIndex !== -1 ? this.questions.splice(questionIndex, 1, newQuestion) : this.questions.push(newQuestion);
    }
}
