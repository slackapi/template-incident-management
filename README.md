# Slack Incident Management Blueprint

An example of managing incidents via Slack

## Workflow

Incidents can be a busy and stressful time. You can alleviate some of this stress by automating it via your Slack workspace.

### Incident Declarations

1. Users declare an incident using a `/incident-declare` command in Slack
2. IncidentBot takes this and

- Creates a channel with the naming format of `#incd-YYYY-MM-DD-1234`, where 1234 is a number identifying the incident
- Notifies the Incidents channel (see Environment variables used below)
- Notifies the incident responders

### Incident Reporting

1. Users file reports in an incident channel using a `/incident-can-report` command in Slack
2. IncidentBot takes this and

- Posts a formatted message to the channel containing the report
- Pins the formatted message

## Environment variables used

- `BOT_TOKEN` : The `xoxb` token for your app
- `SIGNING_SECRET` : The signing secret from your app configuration
- `INCIDENTS_CHANNEL` : A channel which recieves messages for all declared incidents

## Known limitations

This is really just a proof of concept, so some shortcuts have been taken for the sake of brevity

- Incident numbers are actually just a random integer. For a production deployment, we'd recommend using a unique number with some actual significance
- Nothing is persisted to a data store. For running historical analytics etc, it would probably be useful to log all incidents to a DB
- Incident responders are hardcoded into the tool. This would probably be better served via configuration
