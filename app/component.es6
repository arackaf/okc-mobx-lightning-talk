import React, { Component } from 'react';
import { action, observable, autorun } from 'mobx';
import { observer } from 'mobx-react';
import booksData from './books';

class BooksStore{
    search = '';
    setSearch = value => this.search = value;
    books = [];

    runSearch = () => this.books = booksData.filter(book => !this.search || new RegExp(this.search, 'i').test(book.title));

    constructor(){
        autorun(() => {
            let currentSearch = this.search;

            console.log('Changed to', currentSearch || '<empty>');
        });
    }
}

//----------------------------------------------------------------------------------------------------

const Store = new BooksStore();

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

/*

NOTES

- autorun
- reducing edit field bpolerplate
- transactions


*/