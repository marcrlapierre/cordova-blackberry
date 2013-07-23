/*
 * Copyright 2013  QNX Software Systems Limited
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"). You
 * may not reproduce, modify or distribute this software except in
 * compliance with the License. You may obtain a copy of the License
 * at: http://www.apache.org/licenses/LICENSE-2.0.
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OF ANY KIND, either express or implied.
 * This file may contain contributions from others, either as
 * contributors under the License or as licensors under other terms.
 * Please review this entire file for other proprietary rights or license
 * notices, as well as the applicable QNX License Guide at
 * http://www.qnx.com/legal/licensing/document_archive/current_matrix.pdf
 * for other information.
 *  
 */

 /**
 * Contains methods to fix webworks issues 
 *
 * @author mlapierre
 * $Id: wwfix.js 4273 2012-09-25 17:51:22Z mlapierre@qnx.com $
 */

module.exports = {
	
	/**
	 * Fixes the issue where arguments all come in as strings, still with
	 * URI encoding, and encoded to JSON
	 * @param args {Object} The collection of arguments
	 * @returns {Object} A copy of the args object, properly typed and cleanued up
	 */
	parseArgs : function (args) {
		try {
			if (args && Object.keys(args).length > 0) {
				var out = {};
				for (var i in args) {
					// Prune undefined arguments
					if(args[i] === 'undefined') {
						delete args[i]; 
					} else {
						//decode uri vars, because webworks doesn't	
						//and we need to JSON.parse it because webworks calls JSON.stringify
						out[i] = JSON.parse(decodeURIComponent(args[i]));
					}
				}
				return out;
			} else {
				return args;
			}
		} catch (e) {
			console.log('parseArgs error', e);
			return args;
		}
	}
};
