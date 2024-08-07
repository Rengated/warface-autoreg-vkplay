import { Person } from "../types/Person.js";
import { getRandomInt } from "./getRandomInt.js";

const generateRandomUsername = (length: number) => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length!; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateRandomEmail = () => {
  const randomUsername = generateRandomUsername(10);
  return `${randomUsername}@${process.env.IMAP_DOMAIN}`.toLowerCase();
};

const getRandomDate = (startYear: number, endYear: number): string => {
  let year = getRandomInt(startYear, endYear);
  let month = String(getRandomInt(1, 12));
  let day = String(getRandomInt(1, 28));
  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
};

const getRandomName = (gender: string): string => {
  const maleNames = [
    "Александр",
    "Михаил",
    "Дмитрий",
    "Андрей",
    "Иван",
    "Юрий",
    "Павел",
    "Виктор",
    "Сергей",
    "Николай",
    "Олег",
    "Евгений",
    "Борис",
    "Геннадий",
    "Максим",
    "Владимир",
    "Леонид",
    "Антон",
    "Константин",
    "Артем",
    "Роман",
    "Виталий",
    "Георгий",
    "Денис",
    "Вячеслав",
    "Станислав",
    "Кирилл",
    "Ростислав",
    "Григорий",
    "Лев",
    "Вадим",
    "Егор",
    "Алексей",
    "Фёдор",
    "Тимур",
    "Эдуард",
    "Арсений",
    "Глеб",
    "Игнат",
    "Илья",
    "Марк",
    "Матвей",
    "Филипп",
    "Давид",
    "Анатолий",
    "Иннокентий",
    "Игнатий",
    "Викентий",
    "Оскар",
    "Тимофей",
    "Руслан",
    "Эммануил",
    "Юлиан",
    "Аркадий",
    "Вадислав",
    "Герман",
    "Эдвин",
    "Милан",
    "Эрнест",
    "Ждан",
    "Нестор",
    "Платон",
    "Прокопий",
    "Никита",
    "Никодим",
    "Ульян",
    "Лазарь",
    "Амвросий",
    "Евсей",
    "Авксентий",
    "Евпатий",
    "Лаврентий",
    "Митрофан",
    "Савва",
    "Серафим",
    "Елисей",
    "Аристарх",
    "Соломон",
    "Евграф",
    "Леонтий",
    "Демьян",
    "Ермак",
    "Фотий",
    "Амвросий",
    "Парамон",
    "Сильвестр",
    "Феоктист",
    "Эльдар",
    "Купрян",
    "Соса",
    "Федот",
  ];

  const femaleNames = [
    "Анна",
    "Мария",
    "Екатерина",
    "Наталья",
    "Ольга",
    "Елена",
    "Татьяна",
    "Ирина",
    "Светлана",
    "Виктория",
    "Алиса",
    "Дарья",
    "Вероника",
    "Юлия",
    "Полина",
    "Ксения",
    "Анастасия",
    "Евгения",
    "Валентина",
    "Людмила",
    "Любовь",
    "Марина",
    "Вера",
    "Галина",
    "Нина",
    "Таисия",
    "Милана",
    "Софья",
    "Алла",
    "Олеся",
    "Надежда",
    "Лилия",
    "Тамара",
    "Регина",
    "Ариадна",
    "Агриппина",
    "Аделина",
    "Юлиана",
    "Лидия",
    "Зоя",
    "Евдокия",
    "Аксинья",
    "Василиса",
    "Глафира",
    "Ульяна",
    "Милена",
    "Анжелика",
    "Алина",
    "Неонила",
    "Эльвира",
    "Инесса",
    "Аурелия",
    "Валерия",
    "Яна",
    "Лариса",
    "Евдокия",
    "Карина",
    "Серафима",
    "Станислава",
    "София",
    "Ростислава",
    "Есения",
    "Зинаида",
    "Любовь",
    "Дана",
    "Леся",
    "Диана",
    "Вероника",
    "Эвелина",
    "Венера",
    "Светлана",
    "Инга",
    "Лолита",
    "Татьяна",
    "Варвара",
    "Пелагея",
    "Сусанна",
    "Эльза",
    "Любомира",
    "Земфира",
    "Патимат",
    "Аркадия",
    "Луиза",
    "Мио",
    "Феврония",
    "Астра",
    "Клара",
    "Кира",
    "Амелия",
    "Грета",
  ];

  if (gender === "мужской") {
    return maleNames[getRandomInt(0, maleNames.length - 1)];
  } else {
    return femaleNames[getRandomInt(0, femaleNames.length - 1)];
  }
};

const getRandomSurname = (gender: string): string => {
  const maleSurnames = [
    "Иванов",
    "Смирнов",
    "Кузнецов",
    "Попов",
    "Васильев",
    "Соколов",
    "Морозов",
    "Петров",
    "Волков",
    "Соловьев",
    "Лебедев",
    "Егоров",
    "Шмидт",
    "Минаев",
    "Королёв",
    "Фёдоров",
    "Жуков",
    "Смирнитский",
    "Медведев",
    "Сафонов",
    "Чернов",
    "Мельников",
    "Афанасиев",
    "Эренбург",
    "Русаков",
    "Барков",
    "Тетерин",
    "Яковлев",
    "Селезнёв",
    "Зайцев",
    "Мищенко",
    "Тихонов",
    "Ефимов",
    "Белозёров",
    "Гаврилов",
    "Маслов",
    "Рубцов",
    "Седов",
    "Прокопенко",
    "Ветров",
    "Фомичев",
    "Калинин",
    "Карелов",
    "Добрынин",
    "Соболев",
    "Винокуров",
    "Ким",
    "Алиев",
    "Голубев",
    "Судаков",
    "Ермаков",
    "Молотов",
    "Суворов",
    "Кулаков",
    "Корнилов",
    "Голованов",
    "Ларин",
    "Русанов",
    "Журавлёв",
    "Моисеев",
    "Шибаев",
    "Тимошенко",
    "Князев",
    "Ковалёв",
    "Литвинов",
    "Робинович",
    "Мещеряков",
    "Лучников",
    "Харитонов",
    "Гордеев",
    "Крылов",
    "Зубов",
    "Тамбовцев",
    "Косов",
    "Шаповалов",
    "Крупин",
    "Лосев",
    "Щербаков",
    "Пересветов",
    "Анисимов",
    "Абрамов",
    "Володин",
    "Сапегин",
    "Новиков",
    "Горбачёв",
    "Морозкин",
    "Наумов",
    "Никоноров",
    "Горшков",
    "Пахомов",
    "Лазарев",
    "Горяинов",
    "Краснов",
    "Волочев",
    "Изотов",
    "Комаров",
    "Пасечник",
    "Кустов",
    "Шершень",
    "Барышников",
  ];

  const femaleSurnames = maleSurnames.map((surname) => surname + "а");
  if (gender === "мужской") {
    return maleSurnames[getRandomInt(0, maleSurnames.length - 1)];
  } else {
    return femaleSurnames[getRandomInt(0, femaleSurnames.length - 1)];
  }
};

const generatePassword = (length = 8) => {
  const upperCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCharacters = '"abcdefghijklmnopqrstuvwxyz';
  const digits = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let password = "";
  password += upperCharacters.charAt(getRandomInt(0, upperCharacters.length - 1));
  password += lowerCharacters.charAt(getRandomInt(0, lowerCharacters.length - 1));
  password += digits.charAt(getRandomInt(0, digits.length - 1));
  password += symbols.charAt(getRandomInt(0, symbols.length - 1));
  password += upperCharacters.charAt(getRandomInt(0, upperCharacters.length - 1));
  password += lowerCharacters.charAt(getRandomInt(0, lowerCharacters.length - 1));
  password += digits.charAt(getRandomInt(0, digits.length - 1));
  password += symbols.charAt(getRandomInt(0, symbols.length - 1));

  return password;
};

export const getRandomPerson = (): Omit<Person, "testing"> => {
  const genders = ["мужской", "женский"];
  const gender = genders[getRandomInt(0, 1)];
  const person = {
    email: generateRandomEmail(),
    firstName: getRandomName(gender),
    surname: getRandomSurname(gender),
    gender: gender,
    birthDate: getRandomDate(1970, 2005),
    password: generatePassword(getRandomInt(8, 15)),
  };

  return person;
};
