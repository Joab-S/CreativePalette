import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  canvasContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(80, 80, 80, 0.8)',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  toolButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedToolButton: {
    backgroundColor: '#FF5F6D',
  },
  drawerButton: {
    position: 'absolute',
    top: '92%',
    left: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
    backgroundColor: 'rgba(80, 80, 80, 0.8)',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 2,
    transform: [{ translateY: 0 }],
  },
  undoRedoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  undoRedoButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  tooltipContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    fontSize: 14,
    textAlign: 'right',
  },

  layersButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 8,
  },
});

export default styles;