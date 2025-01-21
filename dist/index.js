"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Express on Vercel");
});
app.get("/get-directions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.example.com/directions", {
            headers: {
                "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_CLIENT_ID,
                "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET,
            },
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            res.status(500).json({
                error: error.message,
                details: error.response ? error.response.data : null,
            });
        }
        else {
            console.error("Unknown error:", error);
            res.status(500).json({ error: "Unknown error occurred" });
        }
    }
}));
const PORT = process.env.PORT || 0;
const server = app.listen(PORT, () => console.log(`Server ready on port ${server.address().port}`));
exports.default = app;
