import {pool} from '../config/database.js'

const getItems = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM items ORDER BY name')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({error: error.message})
    }
}

const getItemById = async (req, res) => {
    try {
        const id = req.params.id
        const selectQuery = `SELECT *
                             FROM items
                             WHERE id = $1`
        const results = await pool.query(selectQuery, [id])

        if (results.rows.length === 0) {
            return res.status(404).json({error: 'Not found'})
        }

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({error: error.message})
    }
}

export default {
    getItems,
    getItemById
}
