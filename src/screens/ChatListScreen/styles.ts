import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.white,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.07)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusConnected: {
    backgroundColor: COLORS.green,
  },
  statusDisconnected: {
    backgroundColor: '#FF3D00',
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(249, 250, 251, 0.10)',
  },
  input: {
    flex: 1,
    color: COLORS.white,
    marginLeft: 12,
    fontSize: 15,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.07)',
  },
  unreadIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadIconText: {
    color: '#111827',
    fontSize: 10,
    fontWeight: '700',
  },
  statNumber: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  statLabel: {
    color: COLORS.secondaryText,
    fontSize: 12,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: COLORS.secondaryText,
    fontSize: 16,
    marginTop: 16,
  },
});

export default styles;