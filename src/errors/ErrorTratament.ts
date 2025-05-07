import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorsHandler: ErrorRequestHandler = (err, req, res, next) => {

    console.error(err);

    if (err.errors) {
        res.status(400).json({
        message: "Erro de validação",
        errors: err.errors
        });
    }

    res.status(err.status || 500).json({
        message: err.message || "Erro interno no servidor"
    });
}