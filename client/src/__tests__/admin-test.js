"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import {AdminPage} from '../comps/pages';
import Item from '../comps/item'

import {createStore} from 'redux';
import {connect} from 'react-redux';


import {addEl, deleteEl,changeEl} from '../modules';

import { questionsLoadingAC, questionsErrorAC, questionsSetAC } from "../redux/questionsAC";

import combinedReducer from '../redux/reducers.js';
let store=createStore(combinedReducer);


test('работа adminPage', () => {
	const match = {params: {clid:1}}

    const component = renderer.create(
      <AdminPage match={match}/>
    );


  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const buttonAdd = component.root.find( el => el.props.className=='admin_new' ); 
 
  buttonAdd.props.onClick();

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

});

test('работа Item', () => {

  const el = {
  	question:'C каким из этих государств Россия не имеет сухопутной границы?',
    answers: ["Таджикистан", "Норвегия", "Польша", "КНДР"],
    id:200222
  };

  const component = renderer.create(
    <Item key={el.id} item={el} idx={1}/>
  );


  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const buttonEdit = component.root.find( el => el.props.className=='item_edit' ); 
 
  buttonEdit.props.onClick();

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();


});