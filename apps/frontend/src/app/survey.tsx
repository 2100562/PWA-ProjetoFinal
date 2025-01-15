import SurveyLecturer from './survey-lecturer';
import { useSearch } from '@tanstack/react-router';
import { router } from './app';

export default function Survey() {
  const search = useSearch({ from: '/survey' });

  if (!search?.id) {
    router.navigate({ to: '/' });
  }

  return <SurveyLecturer surveyId={search?.id} />;
}
