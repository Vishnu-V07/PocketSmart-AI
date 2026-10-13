function esc(value) {
    return String(value === undefined || value === null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}


function showPlanner(type) {

    document.getElementById("homePlanner")
        .classList.add("hidden");

    document.getElementById("partyPlanner")
        .classList.add("hidden");

    document.getElementById("jewelryPlanner")
        .classList.add("hidden");


    if (type === "home") {

        document.getElementById("homePlanner")
            .classList.remove("hidden");

    }

    else if (type === "party") {

        document.getElementById("partyPlanner")
            .classList.remove("hidden");

    }

    else if (type === "jewelry") {

        document.getElementById("jewelryPlanner")
            .classList.remove("hidden");

    }
}


async function sendRecommendation(data) {

    const resultContent =
        document.getElementById("resultContent");

    resultContent.innerHTML =
        "<p>🤖 Generating recommendation...</p>";


    try {

        const response = await fetch(
            "/api/recommend",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const result = await response.json();


        if (!result.success) {

            resultContent.innerHTML =
                `<p>Error: ${esc(result.error)}</p>`;

            return;
        }


        displayResult(result.recommendation);

    }

    catch (error) {

        resultContent.innerHTML =
            `<p>Connection Error: ${esc(error)}</p>`;

    }
}


function generateHome() {

    const data = {

        planner_type: "home",

        budget:
            document.getElementById("homeBudget").value,

        rooms:
            document.getElementById("homeRooms").value,

        quantities:
            document.getElementById("homeQuantities").value
    };


    sendRecommendation(data);
}


function generateParty() {

    const data = {

        planner_type: "party",

        budget:
            document.getElementById("partyBudget").value,

        guests:
            document.getElementById("partyGuests").value,

        event_type:
            document.getElementById("eventType").value,

        venue:
            document.getElementById("partyVenue").value
    };


    sendRecommendation(data);
}


function generateJewelry() {

    const data = {

        planner_type: "jewelry",

        budget:
            document.getElementById("jewelryBudget").value,

        occasion:
            document.getElementById("occasion").value,

        style:
            document.getElementById("jewelryStyle").value
    };


    sendRecommendation(data);
}


function displayResult(recommendation) {

    const resultContent =
        document.getElementById("resultContent");


    let html = "";

    html += `<h3>${esc(recommendation.title)}</h3>`;


    if (recommendation.budget) {

        html += `
            <p>
                <strong>Budget:</strong>
                ₹${esc(recommendation.budget)}
            </p>
        `;
    }


    if (recommendation.details) {

        html += "<h4>Details</h4>";

        for (const key in recommendation.details) {

            html += `
                <p>
                    <strong>${esc(key)}:</strong>
                    ${esc(recommendation.details[key])}
                </p>
            `;
        }
    }


    if (recommendation.budget_allocation) {

        html += "<h4>Budget Allocation</h4>";

        recommendation.budget_allocation.forEach(item => {

            html += `
                <div class="recommendation-item">

                    <strong>
                        ${esc(item.category)}
                    </strong>

                    - ${esc(item.percentage)}

                </div>
            `;
        });
    }


    if (recommendation.suggestions) {

        html += "<h4>Suggestions</h4>";

        recommendation.suggestions.forEach(item => {

            html += `
                <div class="recommendation-item">

                    <h4>
                        ${esc(item.item)}
                    </h4>

                    <p>
                        ${esc(item.reason)}
                    </p>

                </div>
            `;
        });
    }


    resultContent.innerHTML = html;
}