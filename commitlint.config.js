export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-case": [2, "always", "lower-case"], // Тип коммита должен быть в нижнем регистре
    "subject-max-length": [2, "always", 72], // Максимальная длина заголовка коммита
  },
};
