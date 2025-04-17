import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.xl,
    color: theme.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.white,
    borderRadius: 8,
    padding: theme.spacing.sm,
    borderColor: theme.textLight,
    borderWidth: 1,
    marginBottom: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.text,
  },
  button: {
    backgroundColor: theme.primary,
    borderRadius: 8,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  buttonText: {
    color: theme.white,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  linkText: {
    color: theme.textLight,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  linkAction: {
    color: theme.secondary,
    fontWeight: 'bold',
  },
});
