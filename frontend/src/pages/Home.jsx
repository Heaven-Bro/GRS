function Home() {
    const username = localStorage.getItem("username");

    return (
        <div>
            <h1>University Grievance Redress System</h1>
            <p>Welcome to the grievance portal.</p>

            {username && <p>Logged in as: {username}</p>}
        </div>
    );
}

export default Home;