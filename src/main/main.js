const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
const express = require("express")
const serveStatic = require("serve-static")

const expressApp = express()

let browserWindow

function createWindow() {

	browserWindow = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true
	})

	browserWindow.loadURL("http://localhost:3000")

	browserWindow.on("closed", function () {
		browserWindow = null
	})

}

if(app.isPackaged) {
	expressApp.use(serveStatic(path.resolve(__dirname, "../../dist/renderer/prod/public")))
} else {
	expressApp.use(serveStatic("dist/renderer/dev/public"))
}

expressApp.listen(3000)

app.on("ready", createWindow)

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

app.on("activate", function () {
	if (browserWindow === null) {
		createWindow()
	}
})
