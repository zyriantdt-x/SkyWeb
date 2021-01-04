import config from "../../config.json"
import knex from 'knex';
import bookshelf from 'bookshelf';

const Adapter = bookshelf(knex(config.database));

export default Adapter;