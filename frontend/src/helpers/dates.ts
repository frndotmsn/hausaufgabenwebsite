import { localeDateStringOptions } from "../constants";

const sameDate = (a: Date, b: Date) => a.toLocaleDateString(localeDateStringOptions.locale) === b.toLocaleDateString(localeDateStringOptions.locale);
export { sameDate };