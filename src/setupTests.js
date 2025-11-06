import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill for React Router + modern APIs
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// ✅ Load Vite env mock
import "./__mocks__/viteEnvMock";
