const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('task-list');

const twitterShareButton = document.getElementById('twitter-share-button');
const whatsappShareButton = document.getElementById('whatsapp-share-button');
const linkedinShareButton = document.getElementById('linkedin-share-button');
const discordShareButton = document.getElementById('discord-share-button');
const copyButton = document.getElementById('copy-button');
const githubButton = document.getElementById('github-button'); // NEW DECLARATION

function addTask() {
    if (inputBox.value === '') {
        alert('You must write something! or the task will not be added.');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00D7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data');
}

function getTasksAsString() {
    let tasks = [];
    let counter = 1;
    listContainer.querySelectorAll('li').forEach(li => {
        let taskText = li.childNodes[0].nodeValue.trim();
        let formattedTask = `${counter}. ${taskText}`;

        if (li.classList.contains('checked')) {
            formattedTask = formattedTask.split('').map(char => char + '\u0336').join('');
        }
        tasks.push(formattedTask);
        counter++;
    });

    let shareContent = "My ToDo List:\n\n";

    if (tasks.length === 0) {
        shareContent += "No tasks currently.";
    } else {
        shareContent += tasks.join('\n');
    }
    
    return shareContent;
}

function shareOnTwitter() {
    const text = getTasksAsString(); 
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=ToDoList`;
    window.open(tweetUrl, '_blank'); 
}

function shareOnWhatsApp() {
    const text = getTasksAsString(); 
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("My Current ToDo List"); 
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`;
    window.open(linkedinUrl, '_blank');

    alert("For LinkedIn, this will open a dialog to share the app's link. If you wish to share your specific ToDo list, you might need to copy it separately (using the 'Copy Tasks' button) and paste it into your post.");
}

function shareOnDiscord() {
    const textToCopy = getTasksAsString();
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Your tasks have been copied to clipboard for Discord! Just paste them into your chat.');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy tasks to clipboard. Please try again or copy manually.');
        });
}

function copyTasksToClipboard() {
    const textToCopy = getTasksAsString();
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Your tasks have been copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy tasks to clipboard. Please try again.');
        });
}

function openGitHubRepo() {
    window.open('https://github.com/Dhruvdesai407/EchoTask/tree/main', '_blank');
}


if (twitterShareButton) {
    twitterShareButton.addEventListener('click', shareOnTwitter);
}
if (whatsappShareButton) {
    whatsappShareButton.addEventListener('click', shareOnWhatsApp);
}
if (linkedinShareButton) {
    linkedinShareButton.addEventListener('click', shareOnLinkedIn);
}
if (discordShareButton) {
    discordShareButton.addEventListener('click', shareOnDiscord);
}
if (copyButton) {
    copyButton.addEventListener('click', copyTasksToClipboard);
}
if (githubButton) { 
    githubButton.addEventListener('click', openGitHubRepo);
}

showTask();
