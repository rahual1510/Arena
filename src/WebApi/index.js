import { put, takeEvery, call, take, } from 'redux-saga/effects'
import { Api } from '../APIs/Api';
import React, { Component } from 'react';
import types from '../types';
import ApiConfig from '../APIs/ApiConfig';
import AsyncStore from '../APIs/AsyncStore'
import NavigationService from '../NavigationService';



const baseUrl = 'https://dev.dashboardarena.com/api/v1/'


export default class WebApi extends Component {

	


 static Participant(participant_id, event_id) {
 	console.log("calling function===",participant_id,"=======>>>><<",event_id)
					  let options = {
					    headers: {
					      'Content-Type': 'multipart/form-data'
					    },
					    method: 'POST'
					  };

					  options.body = new FormData();
					  options.body.append("participant_id", participant_id);
					  options.body.append("event_id", event_id);

					  return fetch(baseUrl+ "participate", options)
					      .then(response => {
					        return response.json()
					          .then(responseJson => {
					            //You put some checks here
					            return responseJson;
					          });
					      });
					}


static getParticipant(id) {
 					  let options = {
					    headers: {
					      'Content-Type': 'multipart/form-data'
					    },
					    method: 'GET'
					  };
					  return fetch(baseUrl+ "participant/"+id, options)
					      .then(response => {
					        return response.json()
					          .then(responseJson => {
					            return responseJson;
					          });
					      });
					}



static participants(event_id) {
 					  let options = {
					    headers: {
					      'Content-Type': 'multipart/form-data'
					    },
					    method: 'POST'
					  };
					  options.body = new FormData();
					  options.body.append("event_id", event_id);
					  console.log("event_id>>>>", event_id);
						return fetch(baseUrl+ "participants", options)
					      .then(response => {
					        return response.json()
					          .then(responseJson => {
					            //You put some checks here
					            return responseJson;
					          });
					      });
					}


static status(status, event_id) {
 					  let options = {
					    headers: {
					      'Content-Type': 'multipart/form-data'
					    },
					    method: 'POST'
					  };
					  options.body = new FormData();
					  options.body.append("status", status);
					  options.body.append("event_id", event_id);
							return fetch(baseUrl+ "change-status", options)
					      .then(response => {
					        return response.json()
					          .then(responseJson => {
					            //You put some checks here
					            return responseJson;
					          });
					      });
					}					




		 




}