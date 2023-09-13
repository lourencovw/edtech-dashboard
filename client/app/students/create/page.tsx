export default function Create() {
    return (
        <form action="">
            <label htmlFor="name"></label>
            <input type="text" name="name" id="name" />
            <label htmlFor="course">Choose a car:</label>
            <select name="course" id="course">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>
        </form>
    );
}