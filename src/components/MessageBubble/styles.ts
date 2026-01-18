import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sentContainer: {
    alignItems: 'flex-end',
  },
  receivedContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
  },
  sentBubble: {
    backgroundColor: COLORS.messageBubbleSent,
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: COLORS.messageBubbleReceived,
    borderBottomLeftRadius: 4,
  },
  senderName: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  sentText: {
    color: COLORS.textSent,
  },
  receivedText: {
    color: COLORS.textReceived,
  },
  timestamp: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  sentTimestamp: {
    color: 'rgba(17, 24, 39, 0.6)',
  },
  receivedTimestamp: {
    color: COLORS.secondaryText,
  },
});

export default styles;