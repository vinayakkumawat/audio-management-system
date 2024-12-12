import { describe, it, expect } from 'vitest';
import { isAudioExpired, getNextQueueNumber, shouldRemoveAudio } from '../../utils/audioQueue';
import { Audio } from '../../types';

describe('audioQueue utils', () => {
  const createMockAudio = (createdAt: string, queue: 1 | 2 | 3): Audio => ({
    id: '1',
    userId: '1',
    url: 'test.mp3',
    createdAt,
    queue,
    played: false,
  });

  describe('isAudioExpired', () => {
    it('returns true for audio older than 10 minutes', () => {
      const oldDate = new Date(Date.now() - 11 * 60 * 1000).toISOString();
      const audio = createMockAudio(oldDate, 1);
      expect(isAudioExpired(audio)).toBe(true);
    });

    it('returns false for audio less than 10 minutes old', () => {
      const recentDate = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const audio = createMockAudio(recentDate, 1);
      expect(isAudioExpired(audio)).toBe(false);
    });
  });

  describe('getNextQueueNumber', () => {
    it('returns next queue number for queues 1 and 2', () => {
      expect(getNextQueueNumber(1)).toBe(2);
      expect(getNextQueueNumber(2)).toBe(3);
    });

    it('returns null for queue 3', () => {
      expect(getNextQueueNumber(3)).toBe(null);
    });
  });

  describe('shouldRemoveAudio', () => {
    it('returns true for expired audio in queue 3', () => {
      const oldDate = new Date(Date.now() - 11 * 60 * 1000).toISOString();
      const audio = createMockAudio(oldDate, 3);
      expect(shouldRemoveAudio(audio)).toBe(true);
    });

    it('returns false for non-expired audio in queue 3', () => {
      const recentDate = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const audio = createMockAudio(recentDate, 3);
      expect(shouldRemoveAudio(audio)).toBe(false);
    });
  });
});