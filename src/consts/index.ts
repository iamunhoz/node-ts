import os from "os"

export const host: { ip: string; port: number } =
	os.hostname() === "krafter"
		? { ip: "127.0.1", port: 3000 }
		: { ip: "0.0.0.0", port: process.env.PORT }
