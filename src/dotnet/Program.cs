using Dapr.Client;

const string appId = "node-app";
const string method = "product";


// Methode #1: avec HttpClient seul
/*
const string backendUrl = $"http://localhost:3500/v1.0/invoke/{appId}";

var httpClient = new HttpClient();
await httpClient.GetAsync($"{backendUrl}/method/{method}");
*/

// Methode #2: avec HttpClient via le SDK dapr
/*
var httpClient = DaprClient.CreateInvokeHttpClient(appId);
await httpClient.GetAsync(method);
*/

// Methode #3: avec DaprClient

var daprClient = new DaprClientBuilder().Build();
await daprClient.InvokeMethodAsync(HttpMethod.Get, appId, method);
