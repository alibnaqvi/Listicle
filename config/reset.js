import {pool} from './database.js'
import './dotenv.js'
import {fileURLToPath} from 'url'
import path from 'path'
import fs from 'fs'

// Read the items.json file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const itemsPath = path.join(__dirname, '../data/items.json')
const itemsData = JSON.parse(fs.readFileSync(itemsPath, 'utf8'))

const createItemsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS items;

        CREATE TABLE IF NOT EXISTS items
        (
            id
            VARCHAR
        (
            255
        ) PRIMARY KEY,
            name VARCHAR
        (
            255
        ) NOT NULL,
            description TEXT NOT NULL,
            category VARCHAR
        (
            255
        ) NOT NULL,
            location VARCHAR
        (
            255
        ) NOT NULL,
            difficulty VARCHAR
        (
            50
        ) NOT NULL,
            image VARCHAR
        (
            500
        ) NOT NULL,
            "hitPoints" INTEGER NOT NULL,
            "attackTypes" TEXT[] NOT NULL,
            loot TEXT[] NOT NULL
            )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 items table created successfully')
    } catch (err) {
        console.error('⚠️ error creating items table', err)
    }
}

const seedItemsTable = async () => {
    await createItemsTable()

    itemsData.forEach((item) => {
        const insertQuery = {
            text: 'INSERT INTO items (id, name, description, category, location, difficulty, image, "hitPoints", "attackTypes", loot) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
        }

        const values = [
            item.id,
            item.name,
            item.description,
            item.category,
            item.location,
            item.difficulty,
            item.image,
            item.hitPoints,
            item.attackTypes,
            item.loot
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting item', err)
                return
            }

            console.log(`✅ ${item.name} added successfully`)
        })
    })
}

seedItemsTable()
