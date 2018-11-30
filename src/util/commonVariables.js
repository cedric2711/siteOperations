//Network

const TIMEOUT = 60000;

//options

const NETWORK_LOAD_OPTIONS = {
    timeout:TIMEOUT,
    waitUntil:"load"
}

const NETWORK_IDLE_OPTIONS = {
    timeout:TIMEOUT,
    waitUntil:"networkidle0"
}

// constancs selectors
const INPUT_FIELD = "#s";
const SEARCH_BUTTON = "#searchsubmit";
const FIRST_RESULT = "#primary #main article div a:nth-child(1)";
const PULL_OUT = "#main";

module.exports ={
    TIMEOUT: TIMEOUT,
    NETWORK_LOAD_OPTIONS: NETWORK_LOAD_OPTIONS,
    NETWORK_IDLE_OPTIONS: NETWORK_IDLE_OPTIONS,
    INPUT_FIELD: INPUT_FIELD,
    SEARCH_BUTTON: SEARCH_BUTTON,
    FIRST_RESULT: FIRST_RESULT,
    PULL_OUT: PULL_OUT
}