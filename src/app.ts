import app from './server'

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server litening on http://localhost:${4000}`)
})
