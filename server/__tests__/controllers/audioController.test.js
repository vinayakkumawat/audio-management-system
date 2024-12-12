import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleNewAudio, handleAudioRemoved } from '../../controllers/audioController.js';
import { addAudio, removeAudio, getAudio } from '../../data/store.js';

vi.mock('../../data/store.js');
vi.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

describe('audioController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleNewAudio', () => {
    it('creates and stores new audio correctly', async () => {
      const audioData = {
        userId: 'user1',
        url: 'test.mp3'
      };

      const expectedAudio = {
        id: 'test-uuid',
        userId: 'user1',
        url: 'test.mp3',
        queue: 1,
        played: false,
        createdAt: expect.any(String)
      };

      await handleNewAudio(audioData);

      expect(addAudio).toHaveBeenCalledWith(expectedAudio);
    });
  });

  describe('handleAudioRemoved', () => {
    it('removes existing audio correctly', async () => {
      const audioId = 'test-id';
      const mockAudio = { id: audioId };

      vi.mocked(getAudio).mockResolvedValue(mockAudio);

      await handleAudioRemoved(audioId);

      expect(removeAudio).toHaveBeenCalledWith(audioId);
    });

    it('throws error when audio not found', async () => {
      vi.mocked(getAudio).mockResolvedValue(null);

      await expect(handleAudioRemoved('non-existent'))
        .rejects.toThrow('Audio not found');
    });
  });
});