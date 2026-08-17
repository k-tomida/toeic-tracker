import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
    changeTagByCategory,
    changeTagByWordClass,
    changeTagByStatus,
} from "./changeTag";

describe("changeTagByCategory", () => {
    describe("span", () => {
        it("LISTENINGの場合、リスニングのタグを返す", () => {
            render(<>{changeTagByCategory("LISTENING", "span")}</>);

            expect(screen.getByText("リスニング")).toBeInTheDocument();
        });

        it("VOCABULARYの場合、単語のタグを返す", () => {
            render(<>{changeTagByCategory("VOCABULARY", "span")}</>);

            expect(screen.getByText("単語")).toBeInTheDocument();
        });

        it("GRAMMARの場合、文法のタグを返す", () => {
            render(<>{changeTagByCategory("GRAMMAR", "span")}</>);

            expect(screen.getByText("文法")).toBeInTheDocument();
        });

        it("MOCK_EXAMの場合、模試のタグを返す", () => {
            render(<>{changeTagByCategory("MOCK_EXAM", "span")}</>);

            expect(screen.getByText("模試")).toBeInTheDocument();
        });
    });

    describe("radio", () => {
        it("チェック済みの場合、カテゴリのタグを返す", () => {
            render(
                <>
                    {changeTagByCategory(
                        "LISTENING",
                        "radio",
                        true
                    )}
                </>
            );

            expect(screen.getByText("リスニング")).toBeInTheDocument();
            expect(screen.getByRole("radio")).toBeInTheDocument();
        });

        it("未チェックの場合、カテゴリのタグを返す", () => {
            render(
                <>
                    {changeTagByCategory(
                        "LISTENING",
                        "radio",
                        false
                    )}
                </>
            );

            expect(screen.getByText("リスニング")).toBeInTheDocument();
            expect(screen.getByRole("radio")).not.toBeChecked();
        });
    });
});

describe("changeTagByWordClass", () => {
    it("NOUNの場合、名詞のタグを返す", () => {
        render(<>{changeTagByWordClass("NOUN")}</>);

        expect(screen.getByText("名詞")).toBeInTheDocument();
    });

    it("VERBの場合、動詞のタグを返す", () => {
        render(<>{changeTagByWordClass("VERB")}</>);

        expect(screen.getByText("動詞")).toBeInTheDocument();
    });

    it("ADJECTIVEの場合、形容詞のタグを返す", () => {
        render(<>{changeTagByWordClass("ADJECTIVE")}</>);

        expect(screen.getByText("形容詞")).toBeInTheDocument();
    });

    it("ADVERBの場合、副詞のタグを返す", () => {
        render(<>{changeTagByWordClass("ADVERB")}</>);

        expect(screen.getByText("副詞")).toBeInTheDocument();
    });

    it("PREPOSITIONの場合、前置詞のタグを返す", () => {
        render(<>{changeTagByWordClass("PREPOSITION")}</>);

        expect(screen.getByText("前置詞")).toBeInTheDocument();
    });

    it("CONJUNCTIONの場合、接続詞のタグを返す", () => {
        render(<>{changeTagByWordClass("CONJUNCTION")}</>);

        expect(screen.getByText("接続詞")).toBeInTheDocument();
    });

    it("AUXILIARY_VERBの場合、助動詞のタグを返す", () => {
        render(<>{changeTagByWordClass("AUXILIARY_VERB")}</>);

        expect(screen.getByText("助動詞")).toBeInTheDocument();
    });
});

describe("changeTagByStatus", () => {
    describe("span", () => {
        it("ACQUIREDの場合、習得済みのタグを返す", () => {
            render(<>{changeTagByStatus("ACQUIRED", "span")}</>);

            expect(screen.getByText("習得済み")).toBeInTheDocument();
        });

        it("UNACQUIREDの場合、未習得のタグを返す", () => {
            render(<>{changeTagByStatus("UNACQUIRED", "span")}</>);

            expect(screen.getByText("未習得")).toBeInTheDocument();
        });
    });

    describe("radio", () => {
        it("チェック済みの場合、習得済みのタグを返す", () => {
            render(
                <>
                    {changeTagByStatus(
                        "ACQUIRED",
                        "radio",
                        true
                    )}
                </>
            );

            expect(screen.getByText("習得済み")).toBeInTheDocument();
            expect(screen.getByRole("radio")).toBeInTheDocument();
        });

        it("未チェックの場合、未習得のタグを返す", () => {
            render(
                <>
                    {changeTagByStatus(
                        "UNACQUIRED",
                        "radio",
                        false
                    )}
                </>
            );

            expect(screen.getByText("未習得")).toBeInTheDocument();
            expect(screen.getByRole("radio")).not.toBeChecked();
        });
    });
});