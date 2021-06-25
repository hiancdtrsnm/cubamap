import os
from typing import Dict
import streamlit.components.v1 as components
import json

_RELEASE = False
_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "cuba_mun_map",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("cuba_mun_map",
                                                   path=build_dir)


def cuba_mun_map(mun_map: Dict[str, int], key=None):
    component_value = _component_func(mun_map=mun_map, key=key, default=0)
    return component_value


if not _RELEASE:
    import streamlit as st
    st.subheader("Leaflet - return coords on click")
    data = json.load(open('/home/hian/work/uh/nsitroom/points.json'))
    clicked_coords = cuba_mun_map(mun_map=data)
    st.markdown(clicked_coords)
