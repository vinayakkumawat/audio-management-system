import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AudioPlayer } from '../../components/AudioPlayer';
import { useAudioStore } from '../../store/useAudioStore';

vi.mock('../../store/useAudioStore');

describe('AudioPlayer', () => {
  beforeEach(() => {
    vi.mocked(useAudioStore).mockReturnValue({
      firstQueue: [],
      secondQueue: [],
      thirdQueue: [],
      currentlyPlaying: null,
      error: null,
      isPlaying: false,
      moveToNextQueue: vi.fn(),
      setCurrentlyPlaying: vi.fn(),
      setError: vi.fn(),
      setIsPlaying: vi.fn(),
      cleanExpiredAudios: vi.fn(),
    });
  });

  it('renders audio player', () => {
    render(<AudioPlayer />);
    expect(screen.getByRole('audio')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    vi.mocked(useAudioStore).mockReturnValue({
      ...vi.mocked(useAudioStore)(),
      error: 'Test error message',
    });

    render(<AudioPlayer />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('handles audio end correctly', () => {
    const mockMoveToNextQueue = vi.fn();
    const mockSetCurrentlyPlaying = vi.fn();
    const mockSetIsPlaying = vi.fn();
    const mockAudio = {
      id: '1',
      url: 'test.mp3',
      queue: 1,
      userId: '1',
      createdAt: new Date().toISOString(),
      played: false,
    };

    vi.mocked(useAudioStore).mockReturnValue({
      ...vi.mocked(useAudioStore)(),
      currentlyPlaying: mockAudio,
      moveToNextQueue: mockMoveToNextQueue,
      setCurrentlyPlaying: mockSetCurrentlyPlaying,
      setIsPlaying: mockSetIsPlaying,
    });

    render(<AudioPlayer />);
    fireEvent.ended(screen.getByRole('audio'));

    expect(mockMoveToNextQueue).toHaveBeenCalledWith(mockAudio);
    expect(mockSetCurrentlyPlaying).toHaveBeenCalledWith(null);
    expect(mockSetIsPlaying).toHaveBeenCalledWith(false);
  });
});