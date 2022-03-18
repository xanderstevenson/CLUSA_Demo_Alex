import React from 'react';
import axios from 'axios';

export function objectToQueryString(obj) {
		var str = [];
		for (var p in obj)
		  if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		  }
		return str.join("&");
		}

