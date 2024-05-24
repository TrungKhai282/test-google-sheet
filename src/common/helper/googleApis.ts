import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

export const googleSheet = google.sheets({
  auth,
  version: "v4",
});

export const extraData = (values: any) => {
  const [headers, ...rows]: any = values;
  const items: any = [];

  rows.forEach(function (r: any) {
    const obj: any = {};
    r.forEach(function (c: any, j: any) {
      obj[headers[j]] = c;
    });
    items.push(obj);
  });

  return items;
};
