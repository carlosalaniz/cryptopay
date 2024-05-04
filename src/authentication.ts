import jwt from "jsonwebtoken";
import express from "express";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
  ): Promise<any> {
    if (securityName === "jwt") {
      const token =
        request.body.token ||
        request.query.token ||
        request.headers["authorization"];
  
      return new Promise((resolve, reject) => {
        if (!token) {
          reject(new Error("No token provided"));
        }
        jwt.verify(token, "secret", function (err: any, decoded: any) {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
    }
  }