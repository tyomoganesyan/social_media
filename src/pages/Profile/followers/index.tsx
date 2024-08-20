import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { Link } from "react-router-dom"
import { BASE, DEF } from "../../../helpers/default"
import { getAllFollowers } from "../../../helpers/api"

export const Followers = () => {
    const [followers, setFollower] = useState<IUser[]>([])
    useEffect(() => {
        getAllFollowers()
            .then((response) => {
                if (response.status == "ok") {
                    setFollower(response.payload as IUser[])
                }
            })
    }, [])

    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                minHeight: "100vh",
            }}
        >
            <h1
                style={{
                    color: "black",
                    fontSize: "32px",
                    borderBottom: "3px solid #ddd",
                    paddingBottom: "10px",
                    marginBottom: "30px",
                    fontWeight: "600",
                }}
            >
                Followers

            </h1>
            {
                followers.length ? followers.map(follower => <div key={follower.id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "25px",
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                    }}
                >
                    <Link
                        to={"/profile/" + follower.id}
                        style={{
                            textDecoration: "none",
                            color: "#333",
                            fontWeight: "bold",
                            fontSize: "20px",
                        }}
                    >
                        <img
                            src={follower.picture ? BASE + follower.picture : DEF}
                            alt={`${follower.name} ${follower.surname}`}
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: "20px",
                                border: "2px solid #4A90E2",
                            }}
                        />
                        {follower.name} {follower.surname}
                    </Link>
                </div>
                ) : <p className="bg-light border rounded p-3 shadow-sm text-center text-dark">You haven't any followers yet...</p>
            }
        </div>)
}

