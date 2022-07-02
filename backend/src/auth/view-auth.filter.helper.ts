import { ViewAuthFilter } from "./view-auth.filter";

export const ViewAuthFilterHelper = (redirectTo?: string) => new ViewAuthFilter(redirectTo);