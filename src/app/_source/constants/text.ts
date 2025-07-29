import { TextObject } from "../types/text-object";
import { ScreenComponents } from "../types/type";

export const screenTextObject: Record<
  ScreenComponents,
  { list: TextObject[] }
> = {
  home: {
    list: [
      { id: "first", text: "     안녕하세요     ", className: "" },
      { id: "second", text: " 논리적인 사고를 좋아하며 ", className: "" },
      { id: "third", text: " 되네 가 아닌 왜? 를 생각하는 ", className: "" },
      { id: "fourth", text: "프론트엔드 개발자 박지찬 입니다.", className: "" },
    ],
  },
  skills: {
    list: [{ id: "first", text: "하이용" }],
  },
  myProject: {
    list: [{ id: "first", text: "하이용" }],
  },
  aboutMe: {
    list: [{ id: "", text: "" }],
  },
};
