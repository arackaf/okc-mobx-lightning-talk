﻿import React, { Component } from 'react';
import { action, observable, autorun } from 'mobx';
import { observer } from 'mobx-react';
import booksData from './books';

class BooksStore{
    @observable search = '';
    @action setSearch = value => this.search = value;
    @observable books = [];

    @action runSearch = () => this.books = booksData.filter(book => !this.search || new RegExp(this.search, 'i').test(book.title))
}

//----------------------------------------------------------------------------------------------------

const Store = new BooksStore();

@observer
class Main extends Component {
    render(){
        return (
            <div>
                <input type="text" value={Store.search} onChange={evt => Store.setSearch(evt.target.value)} />
                <button onClick={Store.runSearch}>Search</button>

                <br /><br /><br />
                <ul>{ Store.books.map(book =>
                    <li key={book._id}>{book.title}</li>
                )}</ul>
            </div>
        )
    }
}

export default Main;