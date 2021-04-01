# webhook-adapter

This project allows to integrate Cisco Secure Network Analytics (Stealthwatch) alarms with Webex Teams using the Webex action in the Response Management.
The Webhook action can send outgoing webhook requests in a fixed format, whereas Webex Teams expects the incoming webhooks in a different format.
By running this adapter the webhook requests will be converted so that you can connect both tools together.

## Prerequisites

1. Docker should be installed on the system where you want to run this adapter on.
2. The certificate should be trusted by the Secure Network Analytics Manager.

## Usage

Set the hostname for your webhook adapter in `Caddyfile`, right in the start of the file:
```
<hostname>:8080 {
    reverse_proxy adapter:2015
}
```
> Example:
> ```
> example.com:8080 {
>     reverse_proxy adapter:2015
> }
> ```

Start
```
$ docker-compose up -d
```

In Secure Network Analytics Manager, go to Configure -> Response Management. In the Webhook action, use
```
https://<hostname>:8080/webex-teams/<key>
```
as a Webhook URL.
It must be HTTPS. 

### Proxy
If your appliance is airgapped and you need to use proxy, you can set it in `docker-compose.yml` in the `environment` section for the `adapter` service:
```
environment:
  - PROXY_URL=http://127.0.0.1:3128
```

### Message Template
You can customize the template of the message sent to Webex Teams by editing `src/webex-teams/TEMPLATE.md` file. It must be in Markdown format.
