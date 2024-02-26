import os from "os"

export const host: { ip: string; port: number } =
  os.hostname() === "xdg-mr"
    ? { ip: "127.0.1", port: 3003 }
    : { ip: "0.0.0.0", port: process.env.PORT }
