import { PostDataRequest } from '@fitly/shared/meta';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
    getData(): { message: string } {
        return { message: 'siemanko witam w moim serwisie!' };
    }

    async saveDataToFTP( data: PostDataRequest ): Promise<boolean> {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const jsftp = require("jsftp");
        const buf = Buffer.from(data.message, 'utf8');
        const Ftp = new jsftp({
            host: "ftp.dlptest.com",
            port: 21, // defaults to 21
            user: "dlpuser", // defaults to "anonymous"
            pass: "rNrKYTX9g7z3RgJRmxWuGHbeu" // defaults to "@anonymous"
        });

        try {
            Ftp.put(buf, "fitly_file.txt", err => {
                if (!err) {
                  console.log("File transferred successfully!");
                }
            });

            return true;
        } catch (error) {
            throw new Error(error)
        }
    }
}
