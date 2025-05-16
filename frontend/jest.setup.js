import '@testing-library/jest-dom'
import 'jest-environment-jsdom'

// Add fetch polyfill
global.fetch = jest.fn();

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock window.location
const mockWindow = {
  location: {
    origin: 'http://localhost:3000',
  },
};

Object.defineProperty(window, 'location', {
  value: mockWindow.location,
  writable: true,
});

// Mock window.confirm
window.confirm = jest.fn(() => true); 