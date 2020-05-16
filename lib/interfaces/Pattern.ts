export interface Pattern {
  readonly file: string;
  readonly alwaysIgnored: string[];
  readonly neverIgnored: string[];
}
