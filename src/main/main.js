import { app, BrowserWindow, ipcMain } from "electron"
import path from "path"

let browserWindow

function createWindow() {

	browserWindow = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true,
		icon: path.resolve(__dirname, "../../public/renderer/icon.png")
	})

	browserWindow.loadURL(path.resolve(__dirname, "../../dist/renderer/public/index.html"))

	browserWindow.on("closed", function () {
		browserWindow = null
	})

}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
	app.quit()
} else {
	app.on('second-instance', (event, commandLine, workingDirectory) => {
		// Someone tried to run a second instance, we should focus our window.
		if (browserWindow) {
			if (browserWindow.isMinimized()) browserWindow.restore()
			browserWindow.focus()
		}
	})

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

}


