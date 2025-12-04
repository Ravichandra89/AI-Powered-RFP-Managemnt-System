declare module "emailjs-mime-parser" {
  export class MimeParser {
    node: any;
    onbody?: (node: any) => void;
    write(data: Buffer): void;
    end(): void;
  }
}
