// Copyright (c) The Official Dev
// Licensed under TOD CL 1

// Imports
const { readdir } = require('fs')
const { join } = require("path")

// Colors
require("colors")

// Load
module.exports.load = (client, folder) => {
	// Readdir "folder"
	readdir(join(__dirname, folder), (err, files) => {
		// Error Handling
		if(err) throw new Error(err)
		if(!files) throw new Error(`[The Official Dev Utils:${utils}] Error: No files found in "${folder}"`)

		// File Handling
		files.forEach(file => {
			// Util
			const util = require(`./${join(folder, file)}`)

			// Checking if it is a function
			if(!typeof util === 'function') return // if not, return.

			// Running the util.
			util(client)

			// Log
			setTimeout(() => {
				console.log(`[RafeCyberUtils:${folder}] Successfully loaded util ${util.id}`.green)
			}, 4000)
		})
	})
}
