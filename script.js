console.log('it works');

let topics = []; // mama array
// fetch data
const allTopics = document.querySelector('.topics');
const nextTopicContainer = document.querySelector('.next-topic-container');
const submitBtn = document.querySelector('#submit');
const myForm = document.querySelector('form');
const discussedTopicContainer = document.querySelector('.discussed-topic-container');
const endpoint = 'https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json';
async function fetchTopics() {
    const response = await fetch(endpoint);
    const data = await response.json();
    topics = [...data];
    // store them in the local storage
    storeFromLocalStorage(topics);
    displayTopics(topics);
}


// keep the list in the LS and browser when we reload the page
function initToLocalSotage() {
    const topicStr = localStorage.getItem('topics');
    const lstItems = JSON.parse(topicStr);
    if (lstItems) {
        console.log(lstItems);
        topics.push(...lstItems);
    } else {
        return topics;
    }
    displayTopics(topics);
    storeFromLocalStorage(topics);
}

//store  data in the LS
function storeFromLocalStorage() {
    localStorage.setItem('topics', JSON.stringify(topics));
}

// displaytopics in the html
function displayTopics() {
    // sort the array by upvotes and downvotes
    let sortedByVotes = topics.sort((a, b) => {
        // if they are the same, return the number
        if (a.downvotes == 0 && b.downvotes == 0) {
            return b.upvotes - a.upvotes;
            // if upvotes is bigger, decrease by one
        } else if (a.downvotes == 0 && a.upvotes > 0) {
            return -1;
            // if upvotes is smaller, increase by 2
        } else if (b.downvotes == 0 && b.upvotes > 0) {
            return 1;
        }
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    });

    // diplay undiscussed topic
    let topicDiscusseOn = sortedByVotes.filter(topic => topic.discussedOn === "");
    let html = topicDiscusseOn.map(topic => {
        return `
        <div class="lists">
            <ul>
                <li>
                    <p>${topic.title}</p>
                    <p class="archaive" value="${topic.id}">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 9H10.5M3.75 6H14.25H3.75ZM3.75 6C3.35218 6 2.97064 5.84196 2.68934 5.56066C2.40804 5.27936 2.25 4.89782 2.25 4.5C2.25 4.10218 2.40804 3.72064 2.68934 3.43934C2.97064 3.15804 3.35218 3 3.75 3H14.25C14.6478 3 15.0294 3.15804 15.3107 3.43934C15.592 3.72064 15.75 4.10218 15.75 4.5C15.75 4.89782 15.592 5.27936 15.3107 5.56066C15.0294 5.84196 14.6478 6 14.25 6H3.75ZM3.75 6V13.5C3.75 13.8978 3.90804 14.2794 4.18934 14.5607C4.47064 14.842 4.85218 15 5.25 15H12.75C13.1478 15 13.5294 14.842 13.8107 14.5607C14.092 14.2794 14.25 13.8978 14.25 13.5V6H3.75Z" stroke="#D8779A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </p>
                </li>
                <li>
                    <button class="like" value="${topic.id}">
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15.25" cy="15.25" r="15.25" fill="#FAAE2C"/>
                            <path d="M11.1198 21.8583H9.46776C9.0296 21.8583 8.60938 21.6843 8.29956 21.3744C7.98973 21.0646 7.81567 20.6444 7.81567 20.2063V15.25C7.81567 14.8118 7.98973 14.3916 8.29956 14.0818C8.60938 13.772 9.0296 13.5979 9.46776 13.5979H11.5329M16.9021 13.5979H20.8374C21.119 13.5979 21.3959 13.6699 21.6418 13.807C21.8877 13.9441 22.0945 14.1418 22.2426 14.3813C22.3907 14.6208 22.475 14.8942 22.4877 15.1755C22.5004 15.4567 22.441 15.7366 22.3152 15.9885L19.424 21.7708C19.2868 22.0454 19.0758 22.2764 18.8146 22.4377C18.5534 22.5991 18.2524 22.6845 17.9454 22.6844H14.6272C14.4926 22.6844 14.3579 22.6679 14.2266 22.6348L11.1198 21.8583L16.9021 13.5979ZM16.9021 13.5979V9.46771C16.9021 9.02955 16.7281 8.60933 16.4182 8.29951C16.1084 7.98968 15.6882 7.81562 15.25 7.81562H15.1716C14.7586 7.81562 14.424 8.15017 14.424 8.56319C14.424 9.15299 14.2497 9.72956 13.9218 10.2202L11.1198 14.424V21.8583L16.9021 13.5979ZM16.9021 13.5979H15.25H16.9021Z" stroke="#00473E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>${topic.upvotes}</span>
                    </button>
                    <button class="dislike" value="${topic.id}">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="15" r="15" fill="#FAAE2C"/>
                            <path d="M18.75 9H20.25C20.6478 9 21.0293 9.15804 21.3106 9.43934C21.5919 9.72064 21.75 10.1022 21.75 10.5V15C21.75 15.3978 21.5919 15.7794 21.3106 16.0607C21.0293 16.342 20.6478 16.5 20.25 16.5H18.375M13.5 16.5H9.92695C9.6713 16.5 9.41989 16.4346 9.1966 16.3102C8.97331 16.1857 8.78553 16.0062 8.65111 15.7887C8.51668 15.5713 8.44006 15.3231 8.42853 15.0677C8.417 14.8123 8.47093 14.5582 8.5852 14.3295L11.2102 9.0795C11.3347 8.83026 11.5262 8.62064 11.7632 8.47413C12.0002 8.32762 12.2733 8.25001 12.552 8.25H15.5655C15.6881 8.25007 15.8102 8.26519 15.9292 8.295L18.7492 9L13.5 16.5ZM13.4992 16.5V20.25C13.4992 20.6478 13.6572 21.0294 13.9385 21.3107C14.2198 21.592 14.6014 21.75 14.9992 21.75H15.0712C15.4462 21.75 15.75 21.4463 15.75 21.072C15.75 20.5358 15.9082 20.0122 16.206 19.566L18.75 15.75V9L13.4992 16.5ZM13.5 16.5H15H13.5Z" stroke="#00473E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>${topic.downvotes}</span>
                    </button>
                </li>
            </ul>
    </div>
        `;
    }).join(' ');

    // display discussed topics
    // filter topics alrady discussed
    let topicNotDiscussed = sortedByVotes.filter(topic => topic.discussedOn != "");
    let HTML = topicNotDiscussed.map(topic => {
        // show the discussed date in the list
        const time = new Date(Number(topic.discussedOn) * 1000).getTime();
        const getDay = new Date(time).getDate();
        const getMonth = new Date(time).getMonth() + 1;
        const getYear = new Date(time).getFullYear();
        const fulldate = `${getDay} / ${getMonth}  / ${getYear}`;
        return `
        <div class="lists">
        <ul>
            <li>
                <p>${topic.title}</p>
                <p class="achaive" value="${topic.id}">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 9H10.5M3.75 6H14.25H3.75ZM3.75 6C3.35218 6 2.97064 5.84196 2.68934 5.56066C2.40804 5.27936 2.25 4.89782 2.25 4.5C2.25 4.10218 2.40804 3.72064 2.68934 3.43934C2.97064 3.15804 3.35218 3 3.75 3H14.25C14.6478 3 15.0294 3.15804 15.3107 3.43934C15.592 3.72064 15.75 4.10218 15.75 4.5C15.75 4.89782 15.592 5.27936 15.3107 5.56066C15.0294 5.84196 14.6478 6 14.25 6H3.75ZM3.75 6V13.5C3.75 13.8978 3.90804 14.2794 4.18934 14.5607C4.47064 14.842 4.85218 15 5.25 15H12.75C13.1478 15 13.5294 14.842 13.8107 14.5607C14.092 14.2794 14.25 13.8978 14.25 13.5V6H3.75Z" stroke="#D8779A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </p>
            </li>
            <li class="specific">
                <button class="like">
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15.25" cy="15.25" r="15.25" fill="#FAAE2C"/>
                        <path d="M11.1198 21.8583H9.46776C9.0296 21.8583 8.60938 21.6843 8.29956 21.3744C7.98973 21.0646 7.81567 20.6444 7.81567 20.2063V15.25C7.81567 14.8118 7.98973 14.3916 8.29956 14.0818C8.60938 13.772 9.0296 13.5979 9.46776 13.5979H11.5329M16.9021 13.5979H20.8374C21.119 13.5979 21.3959 13.6699 21.6418 13.807C21.8877 13.9441 22.0945 14.1418 22.2426 14.3813C22.3907 14.6208 22.475 14.8942 22.4877 15.1755C22.5004 15.4567 22.441 15.7366 22.3152 15.9885L19.424 21.7708C19.2868 22.0454 19.0758 22.2764 18.8146 22.4377C18.5534 22.5991 18.2524 22.6845 17.9454 22.6844H14.6272C14.4926 22.6844 14.3579 22.6679 14.2266 22.6348L11.1198 21.8583L16.9021 13.5979ZM16.9021 13.5979V9.46771C16.9021 9.02955 16.7281 8.60933 16.4182 8.29951C16.1084 7.98968 15.6882 7.81562 15.25 7.81562H15.1716C14.7586 7.81562 14.424 8.15017 14.424 8.56319C14.424 9.15299 14.2497 9.72956 13.9218 10.2202L11.1198 14.424V21.8583L16.9021 13.5979ZM16.9021 13.5979H15.25H16.9021Z" stroke="#00473E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>${topic.upvotes}</span>
                </button>
                <button class="dislike">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="15" fill="#FAAE2C"/>
                        <path d="M18.75 9H20.25C20.6478 9 21.0293 9.15804 21.3106 9.43934C21.5919 9.72064 21.75 10.1022 21.75 10.5V15C21.75 15.3978 21.5919 15.7794 21.3106 16.0607C21.0293 16.342 20.6478 16.5 20.25 16.5H18.375M13.5 16.5H9.92695C9.6713 16.5 9.41989 16.4346 9.1966 16.3102C8.97331 16.1857 8.78553 16.0062 8.65111 15.7887C8.51668 15.5713 8.44006 15.3231 8.42853 15.0677C8.417 14.8123 8.47093 14.5582 8.5852 14.3295L11.2102 9.0795C11.3347 8.83026 11.5262 8.62064 11.7632 8.47413C12.0002 8.32762 12.2733 8.25001 12.552 8.25H15.5655C15.6881 8.25007 15.8102 8.26519 15.9292 8.295L18.7492 9L13.5 16.5ZM13.4992 16.5V20.25C13.4992 20.6478 13.6572 21.0294 13.9385 21.3107C14.2198 21.592 14.6014 21.75 14.9992 21.75H15.0712C15.4462 21.75 15.75 21.4463 15.75 21.072C15.75 20.5358 15.9082 20.0122 16.206 19.566L18.75 15.75V9L13.4992 16.5ZM13.5 16.5H15H13.5Z" stroke="#00473E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>${topic.downvotes}</span>
                </button>
            </li>
            <li><p> ${fulldate}</p></li>
        </ul>
        <button class="remove" value="${topic.id}">
            <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 5.125H15.5M14.625 5.125L13.8664 15.7493C13.8349 16.1908 13.6374 16.604 13.3135 16.9056C12.9896 17.2073 12.5634 17.375 12.1208 17.375H4.87925C4.43662 17.375 4.01043 17.2073 3.68652 16.9056C3.36262 16.604 3.16505 16.1908 3.13363 15.7493L2.375 5.125H14.625ZM6.75 8.625V13.875V8.625ZM10.25 8.625V13.875V8.625ZM11.125 5.125V2.5C11.125 2.26794 11.0328 2.04538 10.8687 1.88128C10.7046 1.71719 10.4821 1.625 10.25 1.625H6.75C6.51794 1.625 6.29538 1.71719 6.13128 1.88128C5.96719 2.04538 5.875 2.26794 5.875 2.5V5.125H11.125Z" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
</div>
        `;
    }).join(' ');

    // add the lists to the DOM
    nextTopicContainer.insertAdjacentHTML('beforeend', html);
    discussedTopicContainer.insertAdjacentHTML('beforeend', HTML);
}

// add a new topic and submit 
function addTopics(e) {
    e.preventDefault();
    let el = e.target.closest('form');
    let newTopic = {
            id: Date.now().toString(),
            title: el.topic.value,
            upvotes: "",
            downvotes: "",
            discussedOn: "",
        }
        // push it in the mama array
    topics.push(newTopic);
    // display
    myForm.reset();
    displayTopics(topics);
    allTopics.dispatchEvent(new CustomEvent('topicsUpdated'));
}

// handle all clicks
function handleClicks(e) {
    if (e.target.matches('.dislike')) {
        const buttonDown = e.target.closest('.dislike');
        const idToDecrease = buttonDown.value.id;
        handleDownvotes(Number(idToDecrease));
    }

    if (e.target.matches('.like')) {
        const butnUp = e.target.closest('.like');
        const idToIcnrease = butnUp.value.id;
        handleUpvotes(Number(idToIcnrease));
    }

    if (e.target.matches('.archaive')) {
        const btnAr = e.target.closest('.archaive');
        const idToArchaive = btnAr.value.id;
        handleArchaiveButton(Number(idToArchaive));
    }

    if (e.target.matches('.remove'));
    const buttDel = e.target.closest('.remove');
    const idToDelete = buttDel.value.id;
    deleteTopics(Number(idToDelete));
}

// handle like button
function handleUpvotes(idToIcnrease) {
    topics = topics.find(topic => topic.id === idToIcnrease);
    topics.upvotes++;
    allTopics.dispatchEvent(new CustomEvent('topicsUpdated'));
}

// hanlde dislike button
function handleDownvotes(idToDecrease) {
    topics = topics.find(topic => topic.id === idToDecrease);
    topics.downvotes++;
    allTopics.dispatchEvent(new CustomEvent('topicsUpdated'));
}

// archaive
function handleArchaiveButton(idToArchaive) {
    const newTeaTopic = topics.find(topic => topic.id === idToArchaive);
    topicDiscusseOn.push(newTeaTopic);
    allTopics.dispatchEvent(new CustomEvent('topicsUpdated'));
}

// delete topic
function deleteTopics(idToDelete) {
    topics = topics.filter(topic => topic.id !== idToDelete);
    allTopics.dispatchEvent(new CustomEvent('topicsUpdated'));
}


myForm.addEventListener('submit', addTopics);
window.addEventListener('click', handleClicks);
displayTopics(topics);
fetchTopics();
window.addEventListener('DOMContentLoaded', displayTopics);
allTopics.addEventListener('topicsUpdated', initToLocalSotage);
storeFromLocalStorage();